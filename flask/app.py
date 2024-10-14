# Importing various libraries
try:
    from flask import Flask, render_template, redirect, request, send_from_directory, flash
    import os, re, json, time
except:
    print("Not able to import all of the calls needed from the Flask library.")
 
# The app is an object of type Flask. It needs the current module as input:
app = Flask(__name__)
 

# Accessing the root '/' url will call the hello_world() function:
@app.route('/')
def hello_world():
    print("Hi from inside flask!")        # Find this line!
    result_string = 'Hello, World!!!'     # Finding this line is easier :-)
    return result_string


# Flask simply handles the traffic of strings from place to place! Ok with plaintext
@app.route('/simple')
def simple():
    """ returns a simple string """
    s = """Hi cs49e!!!!, from Flask's endpoint /simple and Python function, simple() 
           <br><br>
           Other endpoints to try:
           <br><br>
           /
           <br><br>
           /simplehtml
           <br><br>
           /simplejson
           <br><br>
           /timestamp
           <br><br>
           /power?base=3&power=5
        """
    return s


# Flask simply handles the traffic of strings from place to place! Ok with HTML
@app.route('/simplehtml')
def simplehtml():
    """ the string can be html... """
    s = """
<html>
<head>
</head>
<body>
<h1>Hi there!</h1>
<p>I'm in HTML...</p>
<p style="font-size:12px;">Emojis at 12 point: <br>  😀 ☕ </p>
</body>
</html>
"""
    return s


# Flask simply handles the traffic of strings from place to place! Ok with JSON
@app.route('/simplejson')
def simplejson():
    """ the string can be json... """
    d = {"key":"value", "answer":42}
    s = json.dumps(d)   # converts dictionary d to a string s
    return s     # try grabbing this json data -- using requests!


# Oooh... let's create our own lookup service! (The next ChatGPT: ChatGMT!)
@app.route('/timestamp')
def seconds_since_1970():
    """ returns a json structure with two key-value pairs:
            'seconds': <the floating-point # of seconds since 1/1/1970>
            'origin': '1/1/1970'
    """
    elapsed_seconds = time.time()  # built-in, counts seconds since 1970
    d = { 'seconds': elapsed_seconds, 
          'origin' : '1/1/1970' }
    s = json.dumps(d)  # using the json library to "dump" a string
    return s    # try grabbing this json data -- using requests!


# Oooh... let's create our own computing service! It's POWERful!
#
# This also shows how to grab the url-based inputs as key:value pairs ("GET" inputs)
@app.route('/power')
def handle_power():
    """ looks for GET inputs base and power and tries to return base**power
    """
    if request.method == 'GET':
        base = 1.0
        power = 1.0
        for key, value in request.args.items():
            if key == "base": base = float(value)    # key value pair: key is the name, value is the value
            if key == "power": power = float(value)  # another example
        # 
        # POWER!
        #
        result = base**power
        return str(result)      # just a string!
        #return '<font size="42px" color="DodgerBlue">' + str(result) + '</font>'
    else:
        return "GET power! (No POSTing.)"
    

# Let's access a "landing page":
@app.route('/index')
def index():
    """ this Python functions returns a string! """
    s = render_template('index.html', title='Home')  # see templates/index.html for this!
    return s


# helper function!
def transform(s):
    """ our own translate function! """
    new_s = ""
    for c in s:
        new_s += c*2  # doubles each letter...
    return new_s


# String-translate page, named text, when we click translate, moves to textResults page
@app.route('/text',methods=['GET','POST'])
def text():
    # get request:
    if request.method == 'GET':  
        return render_template('text.html', title='Home')

    # post request:
    if request.method == 'POST':
        s = request.form['field_text']       # post uses request.form
        new_s = transform(s)  # see above
        return render_template('textResults.html', old_text=s, new_text=new_s)
    

# String-translate page, named text, when we click translate, moves to textResults page
@app.route('/textalt',methods=['GET','POST'])
def textalt(): 
    # get request:
    if request.method == 'GET': 
        print("In textalt GET!") 
        s = request.args['field_text']
        new_s = transform(s)  # see above
        return render_template('textResults.html', old_text=s, new_text=new_s)
    
        #print(f"{request.args=}")
        #s = request.args.get('field_text')   # get uses a dictionary: get is safer!

    # post request:
    if request.method == 'POST':
        print("In textalt POST")
        return render_template('text.html', title='Home')
    

#
# substitution Python function!
#
# This is the only function in which changes are needed!
#
def substitute(old_text, dictionary_of_substitutions):
    """ our substitution engine:
        old_text: the body of text in which to make substitutions
        dictionary_of_substitutions:
          a Python dictionary with
            keys ~ the strings to replace (get rid of)
            values ~ the strings to replace the keys with! 
            
        return value, nex_text: the new text, with substitutions made!
        This is the function to change, to create xkcd-type substitutions!
    """
    # substitute every key with value
    for key, value in dictionary_of_substitutions.items():
        old_text = old_text.replace(key, value)
    return old_text       # return the result


# Substitutions page, when we click submit, it calls the above function...
@app.route('/subs',methods=['GET','POST'])
def subs():
    """ handles the substitutions! """
    if request.method != 'POST': 
        return render_template('subs.html', title='Home')

    if request.method == 'POST':
        # larger textarea
        old_textarea = request.form['textarea_input']
        # old words and new words (their replacements)
        old_word1 = request.form['original_text1']
        old_word2 = request.form['original_text2']
        old_word3 = request.form['original_text3']
        new_word1 = request.form['replacement_text1']
        new_word2 = request.form['replacement_text2']
        new_word3 = request.form['replacement_text3']
        # create a dictionary of substitutions
        substitutions = {}
        substitutions[old_word1] = new_word1
        substitutions[old_word2] = new_word2
        substitutions[old_word3] = new_word3
        # do the transformation in Python
        new_text = substitute(old_textarea, substitutions)
        return render_template('subsResults.html', 
                                old_text=old_textarea, 
                                new_text=new_text)


#
# Image uploading and "color-inversion"
#

# Used for uploading pictures
@app.route('/<filename>')
def get_file(filename):
    """ handles file exchange """
    return send_from_directory('static',filename)

# allowed image types
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in ['png', 'jpg', 'jpeg']

# Image uploading page, 
@app.route('/image', methods=['GET', 'POST'])
def upload_file():
    """ file uploading """
    try:
        from PIL import Image
        import PIL.ImageOps
    except:
        print("Make sure to pip install Pillow")
        return render_template('index.html', title='Home') # back home!

    if request.method != 'POST':  return render_template('image.html')

    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        # If user does not select file, browser has an empty string filename
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        # if the file is valid, do the following
        if file and allowed_file(file.filename):
            # filename = secure_filename(file.filename)
            filename = file.filename  # could secure it
            # Create a path to the image in the upload folder, save the upload file to this path
            save_old=(os.path.join('static', filename))
            file.save(save_old)
            # Take the image, make a new one that is inverted
            img = Image.open(save_old)
            rbg_img = img.convert('RGB')
            inverted_image = PIL.ImageOps.invert(rbg_img)
            save_new=(os.path.join('static', 'new_'+filename))
            inverted_image.save(save_new)
            # Render template with inverted picture
            return render_template('imageResults.html', filename=filename)
        else:
            return render_template('image.html')



# Password enhancer page, when we click submit, it calls the below function...
@app.route('/password',methods=['GET','POST'])
def passw():
    """ make passwords that are easy to crack more complicated by capitalizing every 3rd character (if not letter, then skip for this round) and replacing certain letters with symbols/numbers"""
    
    if request.method != 'POST': 
        return render_template('password.html', title='Home')

    if request.method == 'POST':
        # larger textarea (original password)
        old_textarea = request.form['textarea_input']

        # placeholder for the new password
        newp = ""

        # capitalizing every 3rd character (if not letter, then skip for this round)
        for i in range(len(old_textarea)):
            if (i+1)%3 == 0:
                newp += old_textarea[i].upper() if old_textarea[i].isalpha() else old_textarea[i]
            else:
                newp += old_textarea[i]

        # dictionary for replacing
        substitutions = {}
        substitutions["s"] = "$"
        substitutions["S"] = "5"
        substitutions["i"] = "!"
        substitutions["I"] = "1"
        substitutions["a"] = "@"
        substitutions["t"] = "7"
        substitutions["e"] = "3"
        substitutions["g"] = "9"
        substitutions["G"] = "6"
        substitutions["o"] = "0"
        substitutions["b"] = "8"

        # do the substitution of letters
        for key, value in substitutions.items():
            newp = newp.replace(key, value)

        return render_template('passwordResults.html', 
                                old_text=old_textarea, 
                                new_text=newp)




# The main "function" that runs the app.  (It's not actually a function.)
# If you use external hosting, e.g., PythonAnywhere, the app object is called differently.
# This if statement guards against it being run when not needed:
if __name__ == '__main__':
    # run() method of Flask class runs the application locally
    app.run(debug=True)


