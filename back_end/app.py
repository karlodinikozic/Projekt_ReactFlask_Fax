from  flask import Flask,request,jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import os


app = Flask(__name__)



@app.route('/',methods=['GET'])
def get():
    return jsonify({'msg':'Hello There'})


# OS SPECIFIC PATH
basedirectiory = os.path.abspath(os.path.dirname(__file__))


#Database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///'+ os.path.join(basedirectiory,'db.sqlite')
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
    ## TODO DATE

    def __init__(self,JMBAG,ime,prezime):
        self.JMBAG = JMBAG
        self.ime = ime
        self.prezime = prezime

#Student Schema
class StudentSchema(ma.Schema):
    class Meta:
        fields = ('JMBAG','ime','prezime','br_racunala','is_logged_in')

#init schema
student_schema = StudentSchema()
students_schema = StudentSchema(many=True)  



@app.route('/student',methods=['POST'])
def addStudent():
    JMBAG = request.json['JMBAG']
    ime = request.json['ime']
    prezime = request.json['prezime']

    new_student = Student(JMBAG,ime,prezime)

    db.session.add(new_student)
    db.session.commit()

    return student_schema.jsonify(new_student)

@app.route('/student',methods=['DELETE'])
def deleteStudent():
    JMBAG = request.json['JMBAG']
 
    deletedstudent = Student.query.filter_by(JMBAG = JMBAG)
    result = students_schema.dump(deletedstudent)
    deletedstudent.delete()
    db.session.commit()

   
    return jsonify(result)
 


@app.route('/students',methods=['GET'])
def getStudents():
    all_students = Student.query.all()
    result = students_schema.dump(all_students)
    return jsonify(result)




if __name__ == "__main__":
    app.run(debug=True)