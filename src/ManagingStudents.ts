import { Student } from "./student";
import { ClassName } from "./ClassName";

export class ManagingStudent {
  protected StudentsList: Student[] = [];

  constructor() {}

  protected showStudent() {
    if (this.StudentsList.length === 0) {
      console.log("Không có dữ liệu sinh viên!");
    } else {
      console.table(this.StudentsList);
    }
  }

  getIndex(input: number) : number{
    let index: number = -1;
      this.StudentsList.forEach((item) => {
        
      if (item.getCode() === input) {
        index = this.StudentsList.indexOf(item);
      }
    });
    return index;
    //   this.StudentsList.find(item => item.getCode() === input)
      
  }

  protected findStudentByID(input: number) {
    let foundStatus = false;
    this.StudentsList.forEach((item) => {
      if (item.getCode() === input) {
        foundStatus = true;
        console.table(item);
      }
    });
    if (!foundStatus) {
      console.log(`\nKhông có dữ liệu phù hợp.`);
    }
  }

  protected addStudent(
    code: number,
    studentName: string,
    classRoom: ClassName,
    homeTown: string,
    score: number,
    hobbies: string[]
  ) {
    this.StudentsList.push(
      new Student(code, studentName, classRoom, homeTown, score, hobbies)
    );
  }

  protected idCheck(input: number): boolean {
    let status = false;
    this.StudentsList.forEach((item) => {
      if (item.getCode() === input) {
        status = true;
      }
    });
    return status;
  }

  protected deleteStudent(input: number) {
    let foundStatus = false;
    this.StudentsList.forEach((item) => {
      if (item.getCode() === input) {
        foundStatus = true;
        this.StudentsList.splice(this.StudentsList.indexOf(item), 1);
        console.log(`Xóa thành công sinh viên với ID ${input}`);
      }
    });
    if (!foundStatus) {
      console.log(`Không tìm thấy học viên với ID ${input}.`);
    }
  }
}
