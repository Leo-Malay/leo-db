const fs = require("fs");

class leoDB {
    constructor(params = {}) {
        params.db = params.db || {};
        params.struct = params.struct || {};
        params.dbName = (params.dbName || "leoDB") + ".jsdb";
        this.params = params;
    }
    // Collection
    SelectDB = (name) => {
        this.params.name = name || this.params.name;
    };
    NewDB = (name, fields) => {
        fields.map((e) => e.trim().toLowerCase());
        this.params.db[name] = [];
        this.params.struct[name] = fields;
    };
    DeleteDB = (name) => {
        delete this.params.db[name];
        delete this.params.struct[name];
    };
    // Load and Save
    LoadDB = () => this.read(this.params.dbName);
    SaveDB = () => this.write(this.params.dbName);
    // Document
    Insert = (data) => {
        if (Array.isArray(data))
            data.forEach((ele) => {
                this.params.db[this.params.name].push(this.structDataIn(ele));
            });
        else this.params.db[this.params.name].push(this.structDataIn(data));
    };
    Update = (search, updates) => {
        var i, flag, key, key1;
        search = this.structCompact(search);
        updates = this.structCompact(updates);
        for (i = 0; i < this.params.db[this.params.name].length; i++) {
            flag = 1;
            for (key in search) {
                if (search[key] !== this.params.db[this.params.name][i][key]) {
                    flag = 0;
                    break;
                }
            }
            // If all search condition match
            if (flag === 1) {
                for (key1 in updates) {
                    this.params.db[this.params.name][i][key1] = updates[key1];
                }
            }
        }
    };
    Find = (options = undefined) => {
        if (options === undefined)
            return this.structDataOut(this.params.db[this.params.name]);
        // Creating the Options.
        options = this.structCompact(options);
        // Filtering the data based on options
        var temp = this.params.db[this.params.name].filter((value, index) => {
            for (const key in options) {
                if (key === "OR") {
                    var temp1 = false;
                    for (const k in options[key]) {
                        if (options[key][k].includes(value[k])) {
                            temp1 = true;
                            break;
                        }
                    }
                    return temp1;
                } else if (options[key] !== value[key]) return false;
            }
            return true;
        });
        return this.structDataOut(temp);
    };
    Delete = (options = undefined) => {
        if (options === undefined) this.params.db[this.params.name] = [];
        else {
            // Creating the Options.
            options = this.structCompact(this.params.name, options);
            // Filtering the data based on options
            var temp = this.params.db[this.params.name].filter(
                (value, index) => {
                    for (const key in options) {
                        if (options[key] === value[key]) return false;
                    }
                    return true;
                }
            );
            this.params.db[this.params.name] = temp;
        }
    };
    // Additional functional
    structCompact = (options) => {
        var optionTemp = {};
        for (const key in options) {
            switch (key) {
                case "OR":
                    optionTemp["OR"] = {};
                    for (const k in options[key]) {
                        optionTemp["OR"][
                            this.params.struct[this.params.name].indexOf(k)
                        ] = options[key][k];
                    }
                    break;
                case "AND":
                    break;
                default:
                    optionTemp[
                        this.params.struct[this.params.name].indexOf(key)
                    ] = options[key];
                    break;
            }
        }
        // console.log(optionTemp);
        return optionTemp;
    };
    structDataIn = (data = {}) => {
        // Convert data to compact form.
        var temp = {};
        this.params.struct[this.params.name].forEach((value, index) => {
            temp[index] = data[value].trim();
        });
        return temp;
    };
    structDataOut = (data = []) => {
        // Restruct data to original format.
        var temp = JSON.parse(JSON.stringify(data));
        temp.map((ele) => {
            this.params.struct[this.params.name].forEach((value, index) => {
                ele[value] = ele[index];
                delete ele[index];
            });
        });
        return temp;
    };
    // fileIO
    write = (name) => fs.writeFileSync(name, JSON.stringify(this.params));
    read = (name) => {
        if (fs.existsSync(name)) {
            const temp = JSON.parse(fs.readFileSync(name, "utf8"));
            this.params.struct[temp.name] = temp.struct;
            this.params.db[temp.name] = temp.data;
        }
    };
}

module.exports = new leoDB();
