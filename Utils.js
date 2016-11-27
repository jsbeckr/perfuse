function log(message, obj) {
    str = JSON.stringify(obj);
    str = JSON.stringify(obj, null, 4); // (Optional) beautiful indented output.
    console.log(message);
    console.log("###################################")
    console.log(str); // Logs output to dev tools console.
    console.log("###################################")
}

module.exports = {
    log
}
