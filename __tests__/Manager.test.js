const Manager = require('../lib/Manager');

// Creates manager object  
test('creates an Manager object', () => {
    const manager = new Manager('Jon', 1, 'snoverjon@gmail.com', 2);

    expect(manager.officeNumber).toEqual(expect.any(Number));
});

// Gets role from getRole()
test('gets role of employee', () => {
    const manager = new Manager('Jon', 1, 'snoverjon@gmail.com');

    expect(manager.getRole()).toEqual("Manager");
});