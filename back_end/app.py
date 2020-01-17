from  flask import Flask,request,jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
import os


app = Flask(__name__)
cors =CORS(app)


@app.route('/',methods=['GET'])
def get():
    return jsonify({'msg':'Hello You'})


# OS SPECIFIC PATH
basedirectiory = os.path.abspath(os.path.dirname(__file__))

#Database
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://kdkman:Fakeaccunt1@kdkman.mysql.pythonanywhere-services.com:3306/kdkman$test'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

#Init db
db = SQLAlchemy(app)

#Init ma
ma = Marshmallow(app)

##### TOOD DO THIS THE RIGHT WAY ############
# Student class/model
class Student (db.Model):
    JMBAG = db.Column(db.String(10), primary_key = True)
    ime = db.Column(db.String(100))
    prezime  = db.Column(db.String(100))
    br_racunala = db.Column(db.Integer,default = -1)
    is_logged_in = db.Column(db.Boolean,unique = False, default = False)
    needs_help = db.Column(db.Boolean,unique = False, default = False)
    help_msg = db.Column(db.String)
    ## TODO DATE

    def __init__(self,JMBAG,ime,prezime):
        self.JMBAG = JMBAG
        self.ime = ime
        self.prezime = prezime

#Student Schema
class StudentSchema(ma.Schema):
    class Meta:
        fields = ('JMBAG','ime','prezime','br_racunala','is_logged_in','help_msg','needs_help')


#Studnets Loggin
class LogginSchema(ma.Schema):
    class Meta:
        fields = ('JMBAG','br_racunala','is_logged_in')

#init schema
student_schema = StudentSchema(many=True)
students_schema = LogginSchema(many=True)



@app.route('/student',methods=['POST'])
def addStudent():
    JMBAG = request.json['JMBAG']
    ime = request.json['ime']
    prezime = request.json['prezime']

    print(JMBAG)
    new_student = Student(JMBAG,ime,prezime)

    db.session.add(new_student)
    db.session.commit()

    return {"Add student msg": "Student with JMBAG: "+JMBAG +" added"}


@app.route('/student/<JMBAG>',methods=['GET'])
def getStudent(JMBAG):
    student = Student.query.get(JMBAG)


    result = {"JMBAG":JMBAG,"ime":student.ime,"prezime":student.prezime,"br_rac":student.br_racunala,
    "is_logged_in":student.is_logged_in,"needs_help":student.needs_help,"help_msg":student.help_msg}
    return jsonify(result)


@app.route('/student',methods=['DELETE'])
def deleteStudent():
    JMBAG = request.json['JMBAG']

    deletedstudent = Student.query.get(JMBAG)

    deletedstudent.delete()
    db.session.commit()


    return jsonify({"msg":"Student with JMBAG :"+JMBAG+" deleted"})



@app.route('/students',methods=['GET'])
def getStudents():
    all_students = Student.query.all()
    result = students_schema.dump(all_students)
    return jsonify(result)

@app.route('/login',methods=['PUT'])
def loginStudent():
        JMBAG = request.json['JMBAG']
        print(JMBAG)
        studentUpdate = Student.query.get(JMBAG)

        br_racunala = request.json['br_racunala']

        studentUpdate.br_racunala = br_racunala
        studentUpdate.is_logged_in = True
        result = {"JMBAG":JMBAG,"br_rac":studentUpdate.br_racunala,"is_logged_in":studentUpdate.is_logged_in,}
        db.session.commit()
        return jsonify(result)

@app.route('/logOut/<JMBAG>',methods=['PUT'])
def logOut(JMBAG):

        studentUpdate = Student.query.get(JMBAG)

        studentUpdate.br_racunala = -1
        studentUpdate.is_logged_in = False
        db.session.commit()

        return jsonify({"msg":"logged Out"})

@app.route('/askhelp/<JMBAG>',methods=['PUT'])
def askhelp(JMBAG):
    msg = request.json['msg']

    HelpStudent = Student.query.get(JMBAG)

    HelpStudent.needs_help = True
    HelpStudent.help_msg = msg
    db.session.commit()

    return jsonify({"msg":"Student " + HelpStudent.ime + " needs help!"})

@app.route('/studentsNeedHelp',methods=['GET'])
def studentsneedhelp():

    studentsWhoNeedHelp = Student.query.filter(Student.needs_help == True).all()
    result = student_schema.dump(studentsWhoNeedHelp)

    return jsonify(result)








if __name__ == "__main__":
    app.run(debug=True)
