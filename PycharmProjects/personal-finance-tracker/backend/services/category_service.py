def categorize(description):
    desc = description.lower()
    if "uber" in desc or "ola" in desc:
        return "Transport"
    if "dominos" in desc or "swiggy" in desc:
        return "Food"
    if "rent" in desc:
        return "Rent"
    if "salary" in desc or "income" in desc:
        return "Salary"
    return "Other"
