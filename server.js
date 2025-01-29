const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let people = [
    { id: 1, name: 'Alice', age: 25 },
    { id: 2, name: 'Bob', age: 30 },
    { id: 3, name: 'Charlie', age: 35 }
];

app.get('/people', (req, res) => {
    res.json(people);
});

app.get('/people/:id', (req, res) => {
    const person = people.find(p => p.id === parseInt(req.params.id));
    if (!person) return res.status(404).json({ message: 'Person not found' });
    res.json(person);
});

app.post('/people', (req, res) => {
    const { name, age } = req.body;
    if (!name || !age) {
        return res.status(400).json({ message: 'Name and age are required' });
    }
    const newPerson = { id: people.length + 1, name, age };
    people.push(newPerson);
    res.status(201).json(newPerson);
});

app.put('/people/:id', (req, res) => {
    const person = people.find(p => p.id === parseInt(req.params.id));
    if (!person) return res.status(404).json({ message: 'Person not found' });

    const { name, age } = req.body;
    if (name) person.name = name;
    if (age) person.age = age;

    res.json(person);
});

app.delete('/people/:id', (req, res) => {
    const index = people.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Person not found' });

    people.splice(index, 1);
    res.json({ message: 'Person deleted' });
});

app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
