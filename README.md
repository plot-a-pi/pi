# PI

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
