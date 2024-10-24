// *******************************************
// Set the current year and last modified date
// *******************************************
let currentYear = document.querySelector("#currentYear");
let lastModified = document.querySelector("#lastModified");
const today = new Date();
currentYear.textContent = today.getFullYear();
lastModified.textContent = `Last Modification: ${document.lastModified}`;

// *************************
// Code for Hamburger Button
// *************************
const hamburgerElement = document.querySelector('#myButton');
const navElement = document.querySelector('.menuLinks');

hamburgerElement.addEventListener('click', () => {
    navElement.classList.toggle('open');
    hamburgerElement.classList.toggle('open');
});

// ***********************
// Array of course objects
// ***********************
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

// **************************
// Function to render courses
// **************************
function renderCourses(filteredCourses) {
    const courseList = document.querySelector(`#courseList`);
    courseList.innerHTML = "";
    
    filteredCourses.forEach(element => {
        const course = document.createElement('div');
        course.setAttribute('class', 'courseItem');
        if (element.completed) {
            course.classList.add('completed');
        }
        course.innerHTML = `
        <p>${element.subject} ${element.number}</p>
        `;
        course.addEventListener("click", () => {
            displayCourseDetails(element);
        });
        courseList.appendChild(course);
    });
}

// **********************************************
// Function to calculate and render total credits
// **********************************************
function renderCredits(filteredCourses) {
    const credits = document.querySelector('#credits');
    const number = filteredCourses.reduce((sum, current) => {
        return sum += current.credits;
    }, 0)
    credits.innerHTML = number;
}


// ******************************************************
// Filtering and rendering courses based on button clicks
// ******************************************************
const allButton = document.querySelector("#allButton");
allButton.addEventListener('click', () => {
    renderCourses(courses)
    renderCredits(courses)
});

const cseButton = document.querySelector("#cseButton");
cseButton.addEventListener('click', () => {
    const cseCourses = courses.filter(course => {
        return course.subject === 'CSE';
    })
    renderCourses(cseCourses)
    renderCredits(cseCourses)
});

const wddButton = document.querySelector("#wddButton");
wddButton.addEventListener('click', () => {
    const wddCourses = courses.filter(course => {
        return course.subject === 'WDD';
    })
    renderCourses(wddCourses)
    renderCredits(wddCourses)
});

// ******************************
// Default rendering on page load
// ******************************
renderCourses(courses);
renderCredits(courses);


// *************************
// This is the modal display
// *************************
const courseDetails = document.querySelector("#course-details");

const openModal = document.querySelector(".open-button");
const closeModal = document.querySelector(".close-button");

function displayCourseDetails(course) {
    courseDetails.innerHTML = '';
    courseDetails.innerHTML = `
    <button id="closeModal">❌</button>
    <h2>${course.subject} ${course.number}</h2>
    <h3>${course.title}</h3>
    <p><strong>Credits</strong>: ${course.credits}</p>
    <p><strong>Certificate</strong>: ${course.certificate}</p>
    <p>${course.credits}</p>
    <p><strong>Technologies</strong>: ${course.technology.join(', ')}</p>
    `;
    courseDetails.showModal();

    const closeModal = document.querySelector("#closeModal");
    if (closeModal) {
        closeModal.addEventListener("click", () => {
            courseDetails.close();
        });
    } else {
        console.error("Close button not found");
    }
    
}

