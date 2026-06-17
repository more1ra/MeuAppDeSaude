const fs = require('fs');
const path = require('path');
const dir = 'src/telas';
fs.readdirSync(dir).forEach(f => {
  let p = path.join(dir, f);
  let c = fs.readFileSync(p, 'utf8');
  c = c.replace(/'Home'/g, "'Inicial'");
  c = c.replace(/'Register'/g, "'Cadastro'");
  c = c.replace(/'Profile'/g, "'Perfil'");
  c = c.replace(/'Vitals'/g, "'SinaisVitais'");
  c = c.replace(/'Mood'/g, "'Humor'");
  c = c.replace(/'Reminders'/g, "'Lembretes'");
  fs.writeFileSync(p, c);
});
