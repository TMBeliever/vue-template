export const name = (state) => {
    return `我的名字是 ${state.name}`;
};

export const age = (state) => {
    return `我的年龄是 ${state.age}`;
};

export const other = (state) => {
    return `My name is ${state.name}, I am ${state.age}.`;
};
