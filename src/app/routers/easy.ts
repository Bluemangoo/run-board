import ejs = require("ejs");
import router from "../router";
import * as fs from "fs";
import CONTENT_TYPE from "../../const/CONTENT_TYPE";
import ID from "../../const/ID";

const appJs = "app.276bd057";

router.pattern(/^(?=\/easy\/)/, async function(data, response) {
    const parsed = (<string>data.url).split("/");
    const stuGrade = parsed[2];
    const stuClass = parsed[3];
    response.response = ejs.render(fs.readFileSync(`${process.cwd()}/src/public/easy/index.ejs`).toString(), {
        data: {
            grade: stuGrade,
            class: stuClass
        }
    });
    response.contentType = CONTENT_TYPE.HTML;
});

router.on(`/easy/js/${appJs}.js`, async function(data, response) {
    response.contentType = CONTENT_TYPE.JS;
    let list: number[] = [];
    if (<string>data.query.grade == "1") {
        list = ID.G1[parseInt(<string>data.query.class) - 1];
    }
    if (<string>data.query.grade == "2") {
        list = ID.G2[parseInt(<string>data.query.class) - 1];
    }
    if (<string>data.query.grade == "3") {
        list = ID.G3[parseInt(<string>data.query.class) - 1];
    }
    response.response = ejs.render(fs.readFileSync(`${process.cwd()}/src/public/easy/js/${appJs}.ejs`).toString(), {
        data: {
            idList: JSON.stringify(list)
        }
    });
});