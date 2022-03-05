from distutils.log import debug, error
from flask import Flask, request, jsonify
import xlsxwriter
from sqlalchemy import true
app = Flask(__name__)

@app.route("/activity")
def printActivity():
    print("Activity...")
    activity_excel = xlsxwriter.Workbook("activity.xlsx")
    activity_worksheet = activity_excel.add_worksheet()
    activity_worksheet.write("A1", "Activity...")
    activity_excel.close()
    return "Activity has been appended to the excel sheet"


if __name__ == '__main__':
    app.run(port=8087, debug=true)