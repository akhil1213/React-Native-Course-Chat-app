import knex from "../../../database/knex/knex";

const insertClass = (input) => {
    const { classObj } = input;
    return new Promise((resolve, reject) => {
        knex('class').insert(classObj)
            .then((res) => {
                if (res.rowCount === 1) resolve(classObj);
            })
            .catch((err) => reject(err))
    })
}

export default insertClass;