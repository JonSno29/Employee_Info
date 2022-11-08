const Employee = require('../lib/employee');

// Creates employee object 
test('creates an employee object', () => {
    const employee = new Employee('Jon', '1', 'snoverjon@gmail.com');

    expect(employee.name).toEqual(expect.any(String));
    expect(employee.email).toEqual(expect.any(String));
    expect(employee.id).toEqual(expect.any(Number));
    expect(employee.officeNumber).toEqual(expect.any(Number));
});

// Gets name 
test('gets employee name', () => {
    const employee = new Employee('Jon', '1', 'snoverjon@gmail.com');

    expect(employee.getName()).toEqual(expect.any(String));
});

// Gets emails from getEmail()
test('gets employee email', () => {
    const employee = new Employee('Jon', '1','snoverjon@gmail.com');

    expect(employee.getEmail()).toEqual(expect.stringContaining(employee.email.toString()));
});

// Gets id from getId() 
test('gets employee ID', () => {
    const employee = new Employee('Jon',1, 'snoverjon@gmail.com');

    expect(employee.getId()).toEqual(expect.any(Number));
});

// Gets role from getRole()
test('gets role of employee', () => {
    const employee = new Employee('Jon', '1', 'snoverjon@gmail.com');
expect(employee.getRole()).toEqual("Employee");
})  

//officenumber
test('gets officeNumber of employee', () => {
    const employee = new Employee('1');
    expect(employee.getOfficeNumber()).toEqual(expect.any(officeNumber));

});