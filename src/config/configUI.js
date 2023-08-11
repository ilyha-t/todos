/*
* updateIntervalCreated: time in millsec for update mark created todo;
* appName: name of App, view in NewTaskForm;
* filters: list filters for view app
* */

const config = {
    filters: ['All','Active','Completed'],
    appName: 'Todos',
    updateIntervalCreated: 60000
};

export default config;