namespace FoodyGo.Core.Constants;

public static class Messages
{
    public static class Error
    {
        public const string InvalidCredentials = "Email veya şifre hatalı.";
        public const string EmailAlreadyRegistered = "Bu email adresi zaten kayıtlı.";
        public const string RestaurantNotFound = "Restoran bulunamadı.";
        public const string SuspendedMealLimitExceeded = "12 saat içerisinde yalnızca 5 adet askıda ürün alabilirsiniz.";
        public const string BoxNotFound = "Kutu bulunamadı.";
        public const string NotEnoughStock = "Stokta yeterli ürün yok.";
        public const string NotEnoughSuspendedMeals = "Yeterli askıda yemek bulunmuyor.";
        public const string PaymentMethodNotFound = "Ödeme yöntemi bulunamadı.";
        public const string AlreadyReviewed = "Bu siparişi zaten değerlendirdiniz.";
        public const string UserNotFound = "Kullanıcı bulunamadı.";
        public const string SuspendedMealAlreadyClaimed = "Bu yemek zaten alınmış veya mevcut değil.";
    }

    public static class Notification
    {
        public const string OrderReadyTitle = "Siparişiniz Hazır";
        public const string OrderReadyMessage = "Siparişiniz teslim alınmaya hazır.";
        public const string OrderDeliveredTitle = "Siparişiniz Teslim Edildi";
        public const string OrderDeliveredMessage = "Afiyet olsun!";
    }

    public static class Common
    {
        public const string UnknownProduct = "Bilinmeyen Ürün";
        public const string Empty = "";
        public const string DefaultAddressTitle = "Ev";
        public const string AnonymousUser = "Anonymous";
    }

    public static class Success
    {
        public const string SuspendedMealClaimed = "Suspended meal claimed successfully.";
    }

    public static class Validation
    {
        public const string OrderMustContainItem = "Order must contain at least one item.";
        public const string InvalidRating = "Rating must be between 1 and 5.";
    }
}
