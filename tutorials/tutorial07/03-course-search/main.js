let searchTerm = "";
let openOnly = false;

function isClassFull(course) {
	// Return true if course.Classification.Open === false
	return !course.Classification.Open;
}

function names(instructors) {
	return instructors.Name;
}

function doesTermMatch(course) {
	// If searchTerm is empty, return true (show all courses)
	// Convert searchTerm to lowercase
	// Check if searchTerm appears in (all converted to lowercase):
	//   - course.Code
	//   - course.Title
	//   - course.CRN (convert to string first)
	//   - course.Instructors[].Name (use map to get all names, then join)
	// Use includes() for case-insensitive matching
	// Return true if searchTerm matches any of these fields
	if (searchTerm === '') return true;
	searchTerm = searchTerm.toLowerCase();
	const code = course.Code.toLowerCase().includes(searchTerm);
	const title = course.Title.toLowerCase().includes(searchTerm);
	const crn = course.CRN.toString().includes(searchTerm);
	const instructors = course.Instructors.map(names).join().toLowerCase().includes(searchTerm);
	return (code || title || crn || instructors);
}

function dataToHTML(course) {
	// should return a formatted HTML card with the relevant course info
	// (using template literals). 
	return isClassFull(course) ? `
		<section class="course-card">
		    <h2>${course.Code}: ${course.Title}</h2>
		    <p class="status closed">
		        <i class="fa-solid fa-circle-xmark"></i>
		        Closed &bull; ${course.CRN} &bull;
		        Number on Waitlist: ${course.WaitlistMax - course.WaitlistAvailable}
		    </p>
		    <p>
		        ${course.Days} &bull; ${course.Location.FullLocation} &bull; ${course.Hours} credit hour(s)
		    </p>
		    <p>
		        <strong>${course.Instructors.map(names).join(' &bull; ')}</strong>
		    </p>
		</section>
	` : `
		<section class="course-card">
		    <h2>${course.Code}: ${course.Title}</h2>
		    <p class="status open">
		        <i class="fa-solid fa-circle-check"></i>
		        Open &bull; ${course.CRN} &bull;
		        Seats Available: ${course.EnrollmentMax - course.EnrollmentCurrent}
		    </p>
		    <p>
		        ${course.Days} &bull; ${course.Location.FullLocation} &bull; ${course.Hours} credit hour(s)
		    </p>
		    <p>
		        <strong>${course.Instructors.map(names).join(' &bull ')}</strong>
		    </p>
		</section>
	`;
}

function showMatchingCourses() {
	// 1. Get the .courses container element
	// 2. Clear it
	// 3. Start with courseList (from course-data.js)
	// 4. Apply the filters and store the matched courses in a variable
	// 5. If no courses match, display "No courses match your search." and return
	// 6. Output each course to the .courses container (forEach + insertAdjacentHTML)
	const courseEl = document.querySelector('.courses');
	courseEl.innerHTML = ``;
	let courses = courseList.filter(doesTermMatch);

	if (openOnly)
		courses = courses.filter(course => !isClassFull(course));

	if (courses.length === 0) {
		courseEl.innerHTML = `<h1>No courses match your search.</h1>`;
		return
	}

	courses.forEach(course => courseEl.insertAdjacentHTML("beforeend", dataToHTML(course)));
}

function filterCourses() {
	// Update global variables (searchTerm and openOnly) by
	// reaching into the DOM and retrieving their values
	// Invoke the showMatchingCourses() function
	searchTerm = document.querySelector('#search_term').value;
	openOnly = document.querySelector('#is_open').checked;
	showMatchingCourses();
}

// show all courses initially:
showMatchingCourses();
