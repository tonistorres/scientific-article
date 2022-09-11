# SOBRE EDITOR CONFIG VIDEO: https://www.youtube.com/watch?v=duKqKhtZmPA
# DOCUMENTAÇÃO: EditorConfig is awesome: https://EditorConfig.org
# DOCUMENTAÇÃO: https://prettier.io/docs/en/install.html

MENU="
------------------------------------------------------
1 - Verifique se tem a extensão EditorConfig intalado
no VsCode
https://www.youtube.com/watch?v=duKqKhtZmPA
------------------------------------------------------
"

INSTALLDEPENDECIES(){
echo ---------------------
echo INSTALL DEPENDENCIES
echo ---------------------
sleep 1
echo "[ in 1s axios]"
sleep 1
npm i axios
echo "[ in 1s react-icons ]"
sleep 1
npm install react-icons --save
echo "[ in 1s react-router-dom ]"
sleep
npm i react-router-dom
echo "[ ins 1s react-toastify ] "
npm i react-toastify
echo -------------------------
}

TIME(){
    echo "[in 2s]"
    sleep 1
    echo "[in 1s]"
    sleep
}


GENERATE_EDITOR_CONFIG(){

echo "-----------------------"
echo "Gerando Editor config"
echo "-----------------------"

touch .editorconfig

cat << EOF > .editorconfig
# EditorConfig is awesome: https://EditorConfig.org

# top-most EditorConfig file
root = true

[*]
indent_style = space
# trabalhar com a indentação de dois caracteres
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
# inserir uma linha no final
insert_final_newline = true

EOF
}

CONFIG_FILE_ESLINT_JSON(){
cat << EOF > .eslintrc.json
{
    "env": {
        "browser": true,
        "es2021": true
    },
    "settings": {
      "react":{
        "version":"detect"
      }
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:prettier/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "prettier"
    ],
    "rules": {
      "react/prop-types": "on"
    }
}


EOF
}

CREATE_ESLINT_IGNORE(){
  touch .eslintignore
}

ADDING_CONTENT_ESLINT_IGNORE(){
cat << EOF > .eslintignore
node_modules/
.env
build
dist
EOF
}

PRETTIER_IGNORE(){
touch .prettierignore

cat << EOF > .prettierignore
node_modules/
.env
build
dist
EOF

}

ADDING_CONTENT_PRETTIERRC_JSON(){
cat << EOF > .prettierrc.json
{
  "semi":true,
  "trailingComma":"all",
  "singleQuote":true,
  "printWidth":80,
  "arrowParens":"avoid"
}
EOF
}

CREATE_VSCODE_FOLDER(){
mkdir .vscode
cd .vscode
touch settings.json

cat << EOF > settings.json
{
  "editor.formatOnSave":false,
  "editor.codeActionsOnSave":{
    "source.fixAll.eslint":true
  }
}
EOF

}


INSTALL_EDITOR__CONFIG(){
echo "$MENU"
TIME
# GENERATE_EDITOR_CONFIG
# npm install -D eslint
# npx eslint --init
# npm install -D eslint-plugin-react
# CONFIG_FILE_ESLINT_JSON
# npm install -D eslint-plugin-react-hooks
# CREATE_ESLINT_IGNORE
# ADDING_CONTENT_ESLINT_IGNORE
# npm install --save-dev --save-exact prettier
# echo {}> .prettierrc.json
# ADDING_CONTENT_PRETTIERRC_JSON
# PRETTIER_IGNORE
# npm install -D eslint-plugin-prettier eslint-config-prettier
CREATE_VSCODE_FOLDER

}


INSTALL_EDITOR__CONFIG
