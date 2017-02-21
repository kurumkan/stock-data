export default socket => store => next => action => {

	switch(action.type){
		case 'SEND_STOCK_REMOTE':
			socket.emit('add_stock', action.payload);
			break;
		case 'REMOVE_STOCK':				
			socket.emit('remove_stock', action.payload);					
			break;
	}
	return next(action);
}
