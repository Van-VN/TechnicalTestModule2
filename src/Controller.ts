import { ManagingStudent } from "./ManagingStudents";
import { Student } from "./student";
import { studentCodeValidation } from "./Validate";
import { studentNameValidation } from "./Validate";
import { classNameValidation } from "./Validate";

let readlineSync = require("readline-sync");

export class MainController extends ManagingStudent {
  mainDisplay() {
    console.log(`
        ---------------------------------------------
        CHÀO MỪNG ĐẾN VỚI PHẦN MỀM QUẢN LÝ SINH VIÊN
        ---------------------------------------------
        Chọn tính năng muốn sử dụng:
        
        [1] Hiển thị danh sách sinh viên
        [2] Tìm kiếm sinh viên theo ID
        [3] Tìm kiếm sinh viên theo tên
        [4] Nhập thông tin sinh viên mới
        [5] Chỉnh sửa thông tin sinh viên
        [6] Xóa sinh viên khỏi ứng dụng
        [7] Thoát phần mềm
        ---------------------------------------------`);
    this.mainInput();
  }

  mainInput() {
    let mainInputOption = readlineSync.question(
      `\nPick which task you want to execute: `
    );
    switch (parseInt(mainInputOption)) {
      case 1:
        this.showStudent();
        this.mainDisplay();
        break;
      case 2:
        let studentID = readlineSync.question(
          `\nPlease type in the student's code: `
        );
        this.findStudentByID(studentID);
        this.mainDisplay();
        break;
      case 3:
        let nameToFind = readlineSync.question(
          `\nInput name of the student to find: `
        );
        console.table(this.findStudentByName(nameToFind));
        break;
      case 4:
        this.addStudentInput();
        this.mainDisplay();
        break;
      case 5:
        let studentIDToEdit = readlineSync.question(
          `\nPlease type in the student's code: `
        );
        if (this.idCheck(parseInt(studentIDToEdit))) {
          console.log(
            `Chọn thuộc tính cần chỉnh sửa:\n\n[1] Sửa tên\n[2] Sửa lớp\n[3] Sửa quê quán\n[4] Sửa điểm\n[5] Sửa sở thích\n`
          );
          let inputChoice = +readlineSync.question(`Pick an option: `);
          this.editStudentInput(inputChoice, parseInt(studentIDToEdit));
        } else {
          console.log(`Không tìm thấy sinh viên với mã ${studentIDToEdit}.`);
        }
        this.mainDisplay();
        break;
      case 6:
        let deleteCode = readlineSync.question(
          `\nPlease input the student's code to be deleted: `
        );
        this.deleteStudent(parseInt(deleteCode));
        this.mainDisplay();
        break;
      case 7:
        console.log("Goodbye!");
        break;
      default:
        this.mainDisplay();
        break;
    }
  }

  addStudentInput() {
    let studentCode = readlineSync.question(
      `\nType in the student's ID in number (4 digits): `
    );
    while (
      !studentCodeValidation.test(studentCode) &&
      this.idCheck(parseInt(studentCode))
    ) {
      studentCode = readlineSync.question(
        `\nWrong input or duplicated ID, type in the Student ID again (4 digits): `
      );
    }
    let studentName = readlineSync.question(
      `\nPlease type in the student's name: `
    );
    while (!studentNameValidation.test(studentName)) {
      studentName = readlineSync.question(
        `\nWrong input, retype the student's name without number or special characters: `
      );
    }
    let className = readlineSync.question(
      `\nPlease type in the student's class: `
    );
    while (!classNameValidation.test(className)) {
      className = readlineSync.question(
        `\nWrong input, retype the class from 0 - 3: `
      );
    }
    let studentHomeTown = readlineSync.question(
      `\nPlease type in the student's home town: `
    );
    while (!studentNameValidation.test(studentHomeTown)) {
      studentHomeTown = readlineSync.question(
        `\nWrong input, retype the student's home town without number or special characters:  `
      );
    }
    let studentScore = +readlineSync.question(
      `\nPlease type in the student's score: `
    );
    while (isNaN(studentScore) || studentScore > 10 || studentScore < 0) {
      studentScore = +readlineSync.question(
        `\nWrong input, type in student's score from 0 - 10:  `
      );
    }
    let studentHobbies = readlineSync.question(
      `\nPlease type in the student's hobbies, divided by 'comma/,': `
    );
    studentHobbies = studentHobbies.split(",");

    this.addStudent(
      +studentCode,
      studentName,
      +className,
      studentHomeTown,
      studentScore,
      studentHobbies
    );

    console.log(
      `Thêm học viên ${studentName} với ID ${studentCode} thành công!.`
    );
  }
  editStudentInput(input: number, studentID: number) {
    let studentIndex: number = this.getIndex(studentID);
    console.log(studentIndex);
    switch (input) {
      case 1:
        let studentName = readlineSync.question(
          `\nPlease type in the student's name: `
        );
        while (!studentNameValidation.test(studentName)) {
          studentName = readlineSync.question(
            `\nWrong input, retype the student's name without number or special characters: `
          );
        }
        this.StudentsList[studentIndex].setName(studentName);
        console.log(this.StudentsList[studentIndex]);
        break;
      case 2:
        let className = readlineSync.question(
          `\nPlease type in the student's class: `
        );
        while (!classNameValidation.test(className)) {
          className = readlineSync.question(
            `\nWrong input, retype the class from 0 - 3: `
          );
        }
        this.StudentsList[studentIndex].setClass(className);
        break;
      case 3:
        let studentHomeTown = readlineSync.question(
          `\nPlease type in the student's home town: `
        );
        while (!studentNameValidation.test(studentHomeTown)) {
          studentHomeTown = readlineSync.question(
            `\nWrong input, retype the student's home town without number or special characters:  `
          );
        }
        this.StudentsList[studentIndex].setHomeTown(studentHomeTown);
        break;
      case 4:
        let studentScore = +readlineSync.question(
          `\nPlease type in the student's score: `
        );
        while (isNaN(studentScore) || studentScore > 10 || studentScore < 0) {
          studentScore = +readlineSync.question(
            `\nWrong input, type in student's score from 0 - 10:  `
          );
        }
        this.StudentsList[studentIndex].setScore(studentScore);
        break;
      case 5:
        let studentHobbies = readlineSync.question(
          `\nPlease type in the student's hobbies, divided by 'comma/,': `
        );
        studentHobbies = studentHobbies.split(",");
        this.StudentsList[studentIndex].setHobbies(studentHobbies);
        break;
    }
  }
}
