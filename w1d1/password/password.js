var arg = process.argv[2];

console.log(obfuscate(arg));

function obfuscate(password) {
  var replacements = {'a':'4', 'e':'3', 'o':'0', 'l':'1'};

  var obfuscated_password = '';
  for (var i = 0; i < password.length; i++) {
    obfuscated_password += replaceCharacter(password[i], replacements);
  }
  return obfuscated_password;

  function replaceCharacter(character, replacements) {
    if(character in replacements) {
      return replacements[character];
    }
    return character;
  }
}