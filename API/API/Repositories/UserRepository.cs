using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using API.Models;
using Dapper;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Identity;
using MySql.Data.MySqlClient;

namespace API.Repositories
{
    public class UserRepository
    {
        private readonly string connectionString;

        public UserRepository(string connectionString)
        {
            this.connectionString = connectionString;
        }
        
        public List<User> Get(){
            using (var connection = new MySqlConnection(connectionString))
            {
                return connection.Query<User>("SELECT id, username, firstname, lastname FROM Users").ToList();
            }
        }
        
        public User Get(int id)
        {
            using (var connection = new MySqlConnection(connectionString))
            {
                return connection.QuerySingleOrDefault<User>("SELECT * FROM Users WHERE Id = @id", new { id });
            }
        }
        
        public User GetByUsername(string username)
        {
            using (var connection = new MySqlConnection(connectionString))
            {
                return connection.QuerySingleOrDefault<User>("SELECT * FROM Users WHERE username = @username", new { username });
            }
        }

        public void Create(User user)
        {
            using (var connection = new MySqlConnection(connectionString))
            {                    
                PasswordHasher<string> pw = new PasswordHasher<string>();
                var hash = pw.HashPassword(user.Username, user.Password);
                user.Password = hash;
                connection.Execute("INSERT INTO Users (username, firstname, lastname, password) VALUES(@username, @firstname, @lastname, @password)", user);
            }
        }

        public void Delete(int id)
        {
            using (var connection = new MySqlConnection(connectionString))
            {
                connection.Execute("DELETE FROM Users WHERE id=@id", new { id });
            }
        }
    }
}