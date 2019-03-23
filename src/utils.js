export function debug(field) {
    if(typeof field !== "object") {
        console.error("DEBUG>> <Wrap var in {}> = ", field);
    } else {
        const variableName = Object.keys(field)[0];
        const value = field[variableName]
        console.error("DEBUG>>  " +variableName + "=%O", value);    
    }
}
