const students = [
	{ name: "Alice", age: 20, grade: 85, major: "Computer Science" },
	{ name: "Bob", age: 21, grade: 92, major: "Mathematics" },
	{ name: "Charlie", age: 19, grade: 78, major: "Computer Science" },
	{ name: "Diana", age: 22, grade: 95, major: "Physics" },
	{ name: "Eve", age: 20, grade: 88, major: "Computer Science" }
];

function filterMajor(student) {
	if (student.major === "Computer Science") return student;
}

function filterGrade(student) {
	if (student.grade >= 85) return student;
}

function names(student) {
	return student.name;
}

console.log(students.filter(filterMajor).filter(filterGrade).map(names));
