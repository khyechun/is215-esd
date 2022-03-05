from distutils.log import debug, error
from flask import Flask, request, jsonify
import xlsxwriter
from sqlalchemy import true
app = Flask(__name__)

@app.route("/error")
def printError():
    print("error...")
    error_excel = xlsxwriter.Workbook("error.xlsx")
    error_worksheet = error_excel.add_worksheet()
    error_worksheet.write("A1", "error...")
    error_excel.close()
    return "error has been appended to the excel sheet"


if __name__ == '__main__':
    app.run(port=8086, debug=true)

