﻿using DiscApi.Models.Entities;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace DiscApi.Extensions
{
    public class JWTHelper
    {
        public static JwtSecurityToken GenerateJWTToken(User user, IList<string> roles, string secretString)
        {
            var authClaims = new List<Claim>
            {
                new Claim("email", user.Email),
                new Claim("name", user.FirstName + ' ' + user.LastName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };
            foreach (var role in roles)
            {
                authClaims.Add(new Claim("role", role));
            }
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretString));
            var token = new JwtSecurityToken(
                expires: DateTime.Now.AddDays(2),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );
            return token;
        }
    }
}