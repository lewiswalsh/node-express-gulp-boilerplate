# Personal NodeJS Express Handlebars Gulp boilerplate
A small set of files to get started quickly with a new NodeJS project using Express, Handlebars and Gulp.
This is a general jumping off point for me, I will heavily customise it on a project-by-project basis. It will change often.

### Files
| File | Notes |
| ---- | ----- |
| routes/ | Routes for express, loaded automatically by index.js |
| models/ | models (or classes, if you prefer) |
| views/ | Handlebars layouts, partials and views |
| public/ | static files such as CSS, images, JS etc. |
| public-src/ | Source files (Sass, JS, raw images) to be compiled to public/ |
| app.js | Entry point for program |
| package.json | Configuration for NodeJS/npm |
| processes.json | Configuration for PM2 (pm2 start processes.json) |
| gulpfile.js | Configuration file for Gulp |
| .gitignore | Tells Git what files and folders to ignore |
| .gitattributes | Some directives for Git |
| LICENSE.md | License under which this software is released, typically ISC |
| README.md | This file |

### config/
| File | Notes |
| ---- | ----- |
| config.js | Configuration object for app |
| express-config.js | Configuration just for Express |

### models/
| File | Notes |
| ---- | ----- |
| _db_mysql.js | A simple abstraction for MySQL |
| _hbs_helpers.js | Handlebars helpers I commonly use |
| _utilities.js | Useful functions and variables I commonly use |
