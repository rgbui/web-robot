import { Task } from "./task";



var task = new Task();
//data=fs.readFileSync('tasks/task.json','utf-8');
var data = {};

task.load(data);

task.run();