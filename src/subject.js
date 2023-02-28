class Subject {
  constructor(name, lecturer) {
    this.name = name;
    this.lecturer = lecturer;
  }
}

const subjects = [];

function addSubject() {
  const name = prompt("Enter subject name:");
  const lecturer = parseInt(prompt("Enter subject hours:"));

  const subject = new Subject(name, lecturer);
  subjects.push(subject);
  console.log(subjects);
}
