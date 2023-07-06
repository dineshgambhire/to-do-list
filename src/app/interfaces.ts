
export interface User {
    userId: string;
    userName: string;
    password: string;
    name: string;
    isActive: boolean;
}

export interface Task {
    taskId: string;
    userId: string;
    title: string;
    date: Date; 
    description: string;
    isImportant: boolean;
    isCompleted: boolean;
    createdOn: Date; 
}

export interface Reminder {
    reminderId: string;
    taskId: string;
    reminderTime: Date; 
    createdOn: Date;
    isValid: boolean;
}