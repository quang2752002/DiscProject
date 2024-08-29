using DiscApi.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using static DiscApi.Extensions.VNPayHelper;
using System.Net;
using DiscApi.Base;
using DiscApi.Models.Entities;
using DiscApi.Extensions;
using Azure;
using System.Security.Policy;

namespace DiscApi.Services.Implements
{
    public class VNPayService : IVNPayService
    {

        private readonly IConfiguration _config;

        public VNPayService(IConfiguration config)
        {
            _config = config;
        }

        public string GetUrlPayment(int typePayment, Order order)
        {
            string vnp_Returnurl = _config["VNPAY:ReturnUrl"];
            string vnp_Url = _config["VNPAY:Url"];
            string vnp_TmnCode = _config["VNPAY:TmnCode"];
            string vnp_HashSecret = _config["VNPAY:HashSecret"];



            //Build URL for VNPAY
            VNPayHelper vnpay = new VNPayHelper();

            vnpay.AddRequestData("vnp_Version", VNPayHelper.VERSION);
            vnpay.AddRequestData("vnp_Command", "pay");
            vnpay.AddRequestData("vnp_TmnCode", vnp_TmnCode);
            vnpay.AddRequestData("vnp_Amount", (10000000 * 100).ToString());
            vnpay.AddRequestData("vnp_BankCode", "VNBANK");
            vnpay.AddRequestData("vnp_CreateDate", DateTime.Now.ToString("yyyyMMddHHmmss"));
            vnpay.AddRequestData("vnp_CurrCode", "VND");
            string ipAddress = Dns.GetHostEntry(Dns.GetHostName()).AddressList[1].ToString();
            vnpay.AddRequestData("vnp_IpAddr", ipAddress);

            vnpay.AddRequestData("vnp_Locale", "vn");

            vnpay.AddRequestData("vnp_OrderInfo", "Thanh toan don hang:" + order.Id);
            vnpay.AddRequestData("vnp_OrderType", "other"); //default value: other
            vnpay.AddRequestData("vnp_ReturnUrl", vnp_Returnurl);
            vnpay.AddRequestData("vnp_TxnRef", order.Id.ToString());
            //Add Params of 2.1.0 Version
            vnpay.AddRequestData("vnp_ExpireDate", DateTime.Now.AddMinutes(10).ToString("yyyyMMddHHmmss"));
            //Billing
            vnpay.AddRequestData("vnp_Bill_Mobile", "01234567890");
            vnpay.AddRequestData("vnp_Bill_Email", "quang@gmail.com");
            var fullName = "Quang MAgIc";
            if (!String.IsNullOrEmpty(fullName))
            {
                var indexof = fullName.IndexOf(' ');
                vnpay.AddRequestData("vnp_Bill_FirstName", fullName.Substring(0, indexof));
                vnpay.AddRequestData("vnp_Bill_LastName", fullName.Substring(indexof + 1,
                fullName.Length - indexof - 1));
            }
            vnpay.AddRequestData("vnp_Bill_Address", "China");
            vnpay.AddRequestData("vnp_Bill_City", "Honkong");
            vnpay.AddRequestData("vnp_Bill_Country", "Hanoi");
            vnpay.AddRequestData("vnp_Bill_State", "");
            // Invoice
            vnpay.AddRequestData("vnp_Inv_Phone", "01234567890");
            vnpay.AddRequestData("vnp_Inv_Email", "quang@gmail.com");
            vnpay.AddRequestData("vnp_Inv_Customer", "Quang");
            vnpay.AddRequestData("vnp_Inv_Address", "China");
            vnpay.AddRequestData("vnp_Inv_Company", "Truong Entertainment");
            vnpay.AddRequestData("vnp_Inv_Taxcode", "123");
            vnpay.AddRequestData("vnp_Inv_Type", "Ok");

            string paymentUrl = vnpay.CreateRequestUrl(vnp_Url, vnp_HashSecret);

            return paymentUrl;
        }
    }
}
