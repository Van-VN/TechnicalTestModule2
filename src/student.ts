import { ClassName } from "./ClassName";

export class Student {
  private _studentCode: number;
  private _studentName: string;
  private _classRoom: ClassName;
  private _homeTown: string;
  private _score: number;
  private _hobbies: string[];
  constructor(
    code: number,
    name: string,
    classRoom: ClassName,
    homeTown: string,
    score: number,
    hobbies: string[]
  ) {
    this._studentCode = code;
    this._studentName = name;
    this._classRoom = classRoom;
    this._homeTown = homeTown;
    this._score = score;
    this._hobbies = hobbies;
  }

  getCode(): number {
    return this._studentCode;
  }

  setCode(input: number): void {
    this._studentCode = input;
  }

  getName(): string {
    return this._studentName;
  }

  setName(input: string): void {
    this._studentName = input;
  }

  getClass(): ClassName {
    return this._classRoom;
  }

  setClass(input: ClassName): void {
    this._classRoom = input;
  }

  getHomeTown(): string {
    return this._homeTown;
  }

  setHomeTown(input: string): void {
    this._homeTown = input;
  }

  getScore(): number {
    return this._score;
  }

  setScore(input: number) {
    this._score = input;
  }

  getHobbies(): string[] {
    return this._hobbies;
  }

  setHobbies(input: string[]): void {
    this._hobbies = input;
  }
}
