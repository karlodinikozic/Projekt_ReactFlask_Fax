from app import db
from app import app
from app import Student

db.init_app(app)

db.create_all()
new_student = Student('0246070890','Laura','Sucic')
db.session.add(new_student)
db.session.commit()
