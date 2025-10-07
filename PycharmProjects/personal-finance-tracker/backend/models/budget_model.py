from config import db

def insert_budget(data):
    db.budgets.insert_one(data)

def get_budgets():
    return list(db.budgets.find({}, {"_id": 1, "category": 1, "amount": 1}))

def delete_budget(budget_id):
    from bson.objectid import ObjectId
    db.budgets.delete_one({"_id": ObjectId(budget_id)})
