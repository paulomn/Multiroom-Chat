module.exports.renderChat = function(application, req, res){
	
	/* Thanks to body-parser */
	var formLogin = req.body;

	/* Thanks to express-validator */
	req.assert('nickname', 'Nickname is required').notEmpty();
	req.assert('nickname', 'Nickname should contain between 3 and 15 characters').len(3, 15);

	var errors = req.validationErrors();

	if (errors){
		/* res.send finalize the render (like return;) */
		res.render('index', {validation: errors});
		return;
	}

	/*require gloal variable and emit to client*/
	application.get('io').emit(
		'msgToClient',
		{nickName: formLogin.nickname, message: "I've just entered..."}
	);

	/* Informing the name of the sender */
	res.render('chat', {nickName: formLogin.nickname});
}