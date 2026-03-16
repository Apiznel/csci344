const students = [
	{ name: "Alice", age: 20, grade: 85, major: "Computer Science" },
	{ name: "Bob", age: 21, grade: 92, major: "Mathematics" },
	{ name: "Charlie", age: 19, grade: 78, major: "Computer Science" },
	{ name: "Diana", age: 22, grade: 95, major: "Physics" },
	{ name: "Eve", age: 20, grade: 88, major: "Computer Science" }
];

function sortGrade(a, b) {
	return a.age - b.age;
}

function filterMajor(student) {
	if (student.major === "Computer Science") return student;
}

function format(student) {
	return `"<p><strong>${student.name}:</strong> ${student.grade} (${student.major})</p>"`;
}

console.log(students.filter(filterMajor).toSorted(sortGrade).map(format));
