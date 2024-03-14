export { getLiveRoomId };
function getLiveRoomId() {
    const roomId = location.pathname.split('/')[(this).length - 1];
    return { roomId };
}
