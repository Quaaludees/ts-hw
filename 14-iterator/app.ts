class Task {
    id: number;
    date: string;
    tittle: string;

    constructor(
        id: number,
        date: string,
        tittle: string,
    ) {
        this.id = id;
        this.date = date;
        this.tittle = tittle;
    }
}
enum Direction {
    desc = 'desc', //меньше
    asc = 'asc' //больше
}

class TaskList {
    private tasks: Task[] = [];

    * [Symbol.iterator]() {
        for (let element of this.tasks) {
            yield element;
        }
    }

    public sortBy(key: keyof Task, direction: Direction = Direction.desc): void {
        this.tasks = this.tasks.sort( (a, b) => {
            if (typeof a[key] === "string") {
                return direction === Direction.desc ? (a[key]as string).localeCompare(b[key] as string) : (b[key]as string).localeCompare(a[key] as string);
            }
           return direction === Direction.desc ? a[key] as number - (b[key] as number) : b[key] as number - (a[key] as number);
        });

    }
    public addTask(task: Task) {
        this.tasks.push(task);
    }

    public getTask() {
         return this.tasks;
    }
    public count() {
        return this.tasks.length;
    }

    public getIterator(key: keyof Task, direction?: Direction) {
        return new TaskIterator(this, key, direction);
    }
}

interface IIterator<T> {
    current(): T | undefined;
    next(): T | undefined;
    prev(): T | undefined;
    index(): number;
}

class TaskIterator implements IIterator<Task> {
    private position: number = 0;
    private taskList: TaskList;

    constructor(taskList: TaskList, key: keyof Task, direction?: Direction) {
        taskList.sortBy(key, direction);
        this.taskList = taskList;
    }

    * [Symbol.iterator]() {
        for (let element of this.taskList) {
            yield element;
        }
    }

    current(): Task | undefined {
        return this.taskList.getTask()[this.position];
    }

    next(): Task | undefined {
        this.position += 1;
        return this.taskList.getTask()[this.position];
    }

    prev(): Task | undefined {
        this.position += -1;
        return this.taskList.getTask()[this.position];
    }

    index(): number {
        return this.position;
    }
}

const taskLust = new TaskList();
taskLust.addTask(new Task(8, '22.01.2045', 'UHOOODI'));
taskLust.addTask(new Task(4, '11.01.2030', 'UHOOODI s takoy'));
taskLust.addTask(new Task(34, '11.01.2002', 'UHOOODI s takoy zadachey ne prihodi'));
taskLust.addTask(new Task(9, '11.01.2000', 'UHOOODI s takoy zadachey ne prihodi'));
taskLust.addTask(new Task(64, '11.01.2001', 'UHOOODI s takoy zadachey ne prihodi'));

const iterator = taskLust.getIterator('date', Direction.asc);
console.log(iterator.next());
console.log(iterator.prev());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.index());

for (let e of iterator) {
    console.log(e);
};