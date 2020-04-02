# PLOT A Pi

## Overview

Plot a Pi is an interactive, multi-user data visualization application for exploring the universal constant pi. It is intended to be used by individuals, groups, and educators for the following purposes:

* submit circumference/diameter measurements to a global database used to approximate pi
* explore the effect of sample size on the precision of approximations
* interact with a Monte Carlo approximation of pi
* collect and save group/class datasets and compare to the global approximation of pi
* easily download comma separated values for all circumference vs diameter graphs and pi approximation vs count graphs

## Application Features

### Design

* responsive design for mobile, tablet, and standard desktop screen sizes ranging from 320px to 3000px
* entirety of graph will display on any screen size and aspect ratio
* graph size was designed with rotation of screens in mind
* teachers/educators/groups can use the session feature for group-specific data collection and analysis
* graphs and statistics are updated in real-time and include the following:
  * circumference vs diameter graph
  * pi approximation vs global count graph
  * current pi approximation
  * current % error in pi approximation
  * number of global submissions

### Measurement Submission
* users can choose to submit measurements in cm or in
* users may not submit points that do not have matching units or no units, points where the diamter is greater than that of the circumference, or points that differ drastically from the known value of pi
* submitted points are added to the database on submission and are displayed to any users who have the application running in their browser in real-time
* userPoints (points added by the current user) are displayed with a larger radius and lighter color 
* userPoints are preserved on page load via local storage

### Graphs
* the circumference vs diameter graph is displayed in cm by default
* the circumference vs diameter graph after point submission is displayed in the units selected for the point submission
* user may toggle between cm and in on the circumference vs diameter graph
* user may hover over any point and the coordinates will be displayed
* user may download any graph coordinate pairs in a csv file

### Sessions
* a user who wishes to start a session for collecting a set of data (such as a teacher, educator, or group leader) may sign in through a 3rd party api
* once a session has been created, a link is generated for submitting data points.  The link does not require login and anyone with the link can submit points to that session. 
* a circumference vs diameter graph for all points added to that session can be displayed.  This graph does not contain a pi approximation or error.  The intention of this is to allow teachers/educators to choose how to use the data for their purposes.
* a csv file with all data submitted for a session can be downloaded

### Monte Carlo
* user may add points in increments of 1, 10, 100, and 1000
* points are displayed on a dart board with a circle inscribed in a square
* statistics include total darts, darts in circle, pi approximation, and % error in pi approximation
* pi approximation vs count graph updates as points are added
* derivation of pi approximation is displayed in a modal

## Sockets - socket.io

* Emitter - NEW_GLOBAL_DATA (Setter)
```
{
  circumference: Number,
  circumferenceUnit: String, enum ['cm', 'in', 'm', 'ft'],
  diameter: Number,
  circumferenceUnit: String, enum ['cm', 'in', 'm', 'ft']
}
```

* Emitter - RETRIEVE_GLOBAL_DATA (Getter)
```
{
  circumference: Number,
  circumferenceUnit: String, enum ['cm', 'in', 'm', 'ft'],
  diameter: Number,
  circumferenceUnit: String, enum ['cm', 'in', 'm', 'ft'],
  timeStamp: Date Created,
  sessionId: 'global'
}
```

* Emitter - RETRIEVE_SESSION_DATA (Getter)
```
{
  circumference: Number,
  circumferenceUnit: String, enum ['cm', 'in', 'm', 'ft'],
  diameter: Number,
  circumferenceUnit: String, enum ['cm', 'in', 'm', 'ft'],
  timeStamp: Date Created,
  sessionId: Unique ObjectID from Mongoose
}
```

* Emitter - GET_SESSION_DATA (Getter)
```
Array Of([
  {
  circumference: Number,
  circumferenceUnit: String, enum ['cm', 'in', 'm', 'ft'],
  diameter: Number,
  circumferenceUnit: String, enum ['cm', 'in', 'm', 'ft'],
  timeStamp: Date Created,
  sessionId: Unique ObjectID from Mongoose
  }
])
```

* Emitter - RETRIEVE_GLOBAL_STATS (Getter)
```
{
  count: Number(Current Data Count),
  circumferenceMax: Number(Highest Circumference Provided),
  diameterMax: Number(Highest Diameter Provided),
  diameterTotal: Number(Total of all Diameters),
  circumferenceTotal: Number(Total of all Circumferences),
  mean: circumferenceTotal / diameterTotal,
  piApproximationArray: Array Of[All Means from Global Stats]
}
```

* Emitter - RETRIEVE_SESSION_STATS (Getter)
```
{
  count: Number(Current Data Count),
  circumferenceMax: Number(Highest Circumference Provided),
  diameterMax: Number(Highest Diameter Provided),
  diameterTotal: Number(Total of all Diameters),
  circumferenceTotal: Number(Total of all Circumferences),
  mean: circumferenceTotal / diameterTotal,
  sessionId: Unique ObjectId from Mongoose,
  piApproximationArray: Array Of[All Means from SessionId Stats]
}
```

* Emitter - CREATE_SESSION (Setter)
```
{
  name: String - Session Name,
  teacherId: user uid provided by Firebase Auth
}
```
