var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index');
var should = chai.should();

chai.use(chaiHttp);

describe('test gets', function() {
    it('test that it goes home', function(done) {
        chai.request(server)
        .get('/home')
        .end(function(err,res){
            res.should.have.status(200);
            done();
        });
    });
    it('test that it goes play', function(done) {
        chai.request(server)
        .get('/play')
        .end(function(err,res){
            res.should.have.status(200);
            done();
        });
    });
});

describe('test post', function(){
    it('test that log in works', function(done){
        chai.request(server)
        .post('/login')
        .send({'username':'jacob', 'password':'jacob'})
        .end(function(err,res){
            res.should.have.status(200);
            res.body.SUCCESS.should.have.property('username');
            res.body.SUCCESS.should.have.property('password');
            done();
        });
    });
    it('test invalid user', function(done){
        chai.request(server)
        .post('/login')
        .send(['uweuifw', 'xbhabyeyc'])
        .end(function(err,res){
            res.should.have.status(406);
            done();
        });
    });
    it('test if name already exists', function(done){
        chai.request(server)
        .post('/signup')
        .send(['jacob', 'jacob'])
        .end(function(err,res){
            res.should.have.status(406);
            done();
        });
    });
    it('test if player is banned', function(done){
        chai.request(server)
        .post('/login')
        .send(['cole', '1995'])
        .end(function(err,res){
            res.should.have.status(406);
            done();
        });
    });
});

describe('socket testing', function(){
    socket = io.connect('http://localhost:5000', {
        'reconnection delay' : 0
        , 'reopen delay' : 0
        , 'force new connection' : true
    });
    socket.on('connect', function() {
        console.log('worked');
        done();
    });
    socket.on('disconnect', function() {
        console.log('disconnected');
    })
});

afterEach(function(done) {
    if(socket.connected) {
        console.log('disconnecting');
        socket.disconnect();
    } else {
        console.log('no connection');
    }
    done();
});

it('braodcasting chat to everyone and joining', function(done){
    var test1 = io.connect(socketURL, options);
  
    test1.on('connect', function(data){
      test1.emit('username', chatUser1);
  
      var test2 = io.connect(socketURL, options);
  
      test2.on('connect', function(data){
        test2.emit('username', chatUser2);
      });
  
      test2.on('new user', function(usersName){
        usersName.should.equal(chatUser2.name + " has joined.");
        test2.disconnect();
      });
  
    });
  
    var users = 0;
    test1.on('new user', function(usersName){
      users += 1;
  
      if(users === 2){
        usersName.should.equal(chatUser2.name + " has joined.");
        test1.disconnect();
        done();
      }
    });
  });
  