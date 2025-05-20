
function onFormSubmit(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const studentIdCol = 5;
  const statusCol = 6;
  const row = sheet.getLastRow();

  const data = sheet.getRange(2, studentIdCol, row - 1).getValues();
  const idNumber = data.filter(r => r[0] !== "").length + 1;
  const newStudentId = "STU" + idNumber.toString().padStart(3, '0');

  sheet.getRange(row, studentIdCol).setValue(newStudentId);
  sheet.getRange(row, statusCol).setValue("Confirmed");

  
  sendConfirmationEmail(sheet, row, newStudentId);
}

function sendConfirmationEmail(sheet, row, studentId) {
  const name = sheet.getRange(row, 2).getValue();
  const email = sheet.getRange(row, 3).getValue();
  const course = sheet.getRange(row, 4).getValue();

  const subject = "Registration Confirmed: " + course;
  const body = `Hi ${name},

Your registration for the course "${course}" is confirmed.

Your Student ID: ${studentId}

Thank you!
`;

  GmailApp.sendEmail(email, subject, body);
}
