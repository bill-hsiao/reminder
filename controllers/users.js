const express = require('express');
const mongoose = require('mongoose');

const userController = [signInGet, signInPost, signUpGet, signUpPost]


function signInGet(req, res, next) {
  res.render('../views/user/signin', { title: 'Sign In' });
}

function signInPost(req, res, next) {

}

function signUpGet(req, res, next) {
  res.render('user/signup', { title: 'Sign Up'});
}

function signUpPost(req, res, next) {

}

module.exports = userController;
