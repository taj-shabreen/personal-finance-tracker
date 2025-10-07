from flask import Blueprint, request, jsonify
from models.budget_model import insert_budget, get_budgets, delete_budget

budget_bp = Blueprint("budget_bp", __name__)

@budget_bp.route("/api/budgets/", methods=["GET"])
def list_budgets():
    budgets = get_budgets()
    # convert ObjectId to string for frontend
    for b in budgets:
        b["_id"] = str(b["_id"])
    return jsonify(budgets)

@budget_bp.route("/api/budgets/", methods=["POST"])
def add_budget():
    data = request.json
    if not data.get("category") or not data.get("amount"):
        return jsonify({"error": "Missing fields"}), 400
    insert_budget({"category": data["category"], "amount": data["amount"]})
    return jsonify({"message": "Budget added"}), 201

@budget_bp.route("/api/budgets/<budget_id>", methods=["DELETE"])
def remove_budget(budget_id):
    try:
        delete_budget(budget_id)
        return jsonify({"message": "Budget deleted"})
    except Exception as e:
        return jsonify({"error": str(e)}), 400
