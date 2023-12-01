import * as fs from 'fs/promises';
import * as Path from 'path';
import * as Yaml from 'js-yaml';
import { minify } from 'html-minifier-terser';
import Handlebars from 'handlebars';

const template = await fs.readFile(Path.resolve('index.html.hbs'), 'utf-8');
const render = Handlebars.compile(template);
const options = {
        minifyJS: true,
        minifyCSS: true,
        removeComments: true,
        collapseWhitespace: true,
};

const files = await fs.readdir(".", { withFileTypes: true });
files.filter(entry => entry.isFile())
    .map(file => `${file.path}/${file.name}`)
    .filter(path => path.endsWith('.yaml'))
    .forEach(async function (path) {
        const context = Yaml.load(await fs.readFile(path, 'utf-8'));
        const outfile = Path.parse(`${path.slice(0, -5).replace(':', '/')}.html`);
        const content = await minify(render(context), options);
        await fs.mkdir(outfile.dir, { recursive: true });
        await fs.writeFile(Path.format(outfile), content);
    });
