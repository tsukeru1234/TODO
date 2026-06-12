//!группы
type StudentGroupI = {
  id: number;
  name: string;
};

type IGroup = {
  id: number;
  group_name: string;
  students: StudentGroupI[];
};

type GroupList = {
  [key: string]: IGroup;
};

class Group implements IGroup {
  constructor(
    public id: number,
    public group_name: string,
    public students: StudentGroupI[],
  ) {}
}

//!группы

//!оценки

type IMarks = {
  id: number;
  student_login: string;
  marks: number[];
};

class Marks implements IMarks {
  constructor(
    public id: number,
    public student_login: string,
    public marks: number[],
  ) {}

  add_mark(mark: number): void {this.marks.push(mark)}

  update_mark(mark: number): void {}

  delete_mark(id: number): void {}
}

type MarkList = {
  [key: string]: IMarks;
};

type DisStudentMarks = {
  discipline_name: string;
  student_marks: IMarks;
};

type DisGroupMarks = {
  discipline_name: string;
  group_name: string;
  group_marks: IMarks[];
};
//!оценки

//! преподаватель
interface ITeacher {
  id: number;
  login: string;
  password: string;
}

class Teacher implements ITeacher {
  constructor(
    public id: number,
    public login: string,
    public password: string,
  ) {}

  get_discipline(): string[] {
    return ["математика"];
  } //!берёт логин и ищет в DisciplineList дициплины где записан логин

  get_student_marks(student_login: string): DisStudentMarks | string {
    const studentMarks = marksList.find((obj) => student_login in obj);
    if (!studentMarks) return "такого студента нет";
    return {
      discipline_name: this.get_discipline()[0],
      student_marks: {
        id: studentMarks[student_login].id,
        student_login: studentMarks[student_login].student_login,
        marks: studentMarks[student_login].marks,
      },
    };
  } //!вызывает поиск дисциплин после выбора показывает оценки студента по этой дисциплине

  get_group_marks(group_name: string): DisGroupMarks | string {
    const group = groupList.find((obj) => group_name in obj);
    if (!group) return "такой группы нет";
    const groupMarks: IMarks[] = group[group_name].students.map((student) => {
      const studentMarks = marksList.find((obj) => student.name in obj);
      if (studentMarks)
        return {
          id: studentMarks[student.name].id,
          student_login: studentMarks[student.name].student_login,
          marks: studentMarks[student.name].marks,
        };
      return {
        id: 0,
        student_login: "",
        marks: [0],
      };
    });
    return {
      discipline_name: this.get_discipline()[0],
      group_name: group[group_name].group_name,
      group_marks: groupMarks,
    };
  } //! вызывает поиск дисциплин посве выбора показывает оценки группы по этой дисциплине

  CUD_marks(group_name?: string, student_login?: string): void {} //! позваляет выставлять изменять удалять оценки группы или студента на выбор обращается к классу маркс
}
//! преподаватель

//!студент
interface IStudent {
  id: number;
  login: string;
  password: string;
  group_name: string;
}

class Student implements IStudent {
  constructor(
    public id: number,
    public login: string,
    public password: string,
    public group_name: string,
  ) {}

  get_marks(discipline_name: string): DisStudentMarks | string {
    const studentMarks = marksList.find((obj) => this.login in obj);
    if (!studentMarks) return "такого студента нет";
    return {
      discipline_name: discipline_name,
      student_marks: {
        id: studentMarks[this.login].id,
        student_login: studentMarks[this.login].student_login,
        marks: studentMarks[this.login].marks,
      },
    };
  } //! возвращает оценки студента по выбранной дисциплине
}
//!студент

export const TMax = new Teacher(1, "Макс", "123");

export const SVasa = new Student(1, "Вася", "123", "Ёжики");
export const SAlisa = new Student(2, "Алиса", "123", "Ёжики");

const VasaMarks = new Marks(1, "Вася", [5, 4, 4, 3]);
const AlisaMarks = new Marks(1, "Алиса", [4, 4, 5, 5, 5]);
const marksList: MarkList[] = [{ "Вася": VasaMarks }, { "Алиса": AlisaMarks }];

const eziki = new Group(1, "Ёжики", [
  { id: 1, name: "Вася" },
  { id: 2, name: "Алиса" },
]);
const groupList: GroupList[] = [{ "Ёжики": eziki }];
