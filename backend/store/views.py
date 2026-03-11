from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status

from .models import Category, Product, Cart, CartItem, Order, OrderItem
from .serializiers import (
    ProductSerializer,
    CategorySerializer,
    CartSerializer,
    UserSerializer,
    RegisterSerializer
)


# ---------------- PRODUCTS ---------------- #

@api_view(['GET'])
def get_products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True, context={"request": request})
    return Response(serializer.data)


@api_view(['GET'])
def get_product(request, pk):
    product = get_object_or_404(Product, id=pk)
    serializer = ProductSerializer(product, context={"request": request})
    return Response(serializer.data)


# ---------------- CATEGORIES ---------------- #

@api_view(['GET'])
def get_categories(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)


# ---------------- CART ---------------- #

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_cart(request):
    cart, created = Cart.objects.get_or_create(user=request.user)
    serializer = CartSerializer(cart, context={"request": request})
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request):

    product_id = request.data.get('product_id')

    if not product_id:
        return Response({"error": "Product id required"}, status=400)

    product = get_object_or_404(Product, id=product_id)

    cart, created = Cart.objects.get_or_create(user=request.user)

    item, created = CartItem.objects.get_or_create(
        cart=cart,
        product=product
    )

    if not created:
        item.quantity += 1
        item.save()

    serializer = CartSerializer(cart)

    return Response(
        {"message": "Product added to cart", "cart": serializer.data},
        status=status.HTTP_200_OK
    )


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def remove_from_cart(request):

    item_id = request.data.get("item_id")

    cart = get_object_or_404(Cart, user=request.user)

    CartItem.objects.filter(id=item_id, cart=cart).delete()

    return Response({"message": "Removed from cart"}, status=200)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_cart(request):

    item_id = request.data.get('item_id')
    quantity = request.data.get('quantity')

    if not item_id or quantity is None:
        return Response(
            {"error": "Item id and quantity required"},
            status=400
        )

    cart = get_object_or_404(Cart, user=request.user)

    try:
        item = CartItem.objects.get(id=item_id, cart=cart)

        quantity = int(quantity)

        if quantity < 1:
            item.delete()
            return Response(
                {"message": "Item removed from cart"},
                status=200
            )

        item.quantity = quantity
        item.save()

        serializer = CartSerializer(cart)

        return Response(serializer.data)

    except CartItem.DoesNotExist:
        return Response(
            {"error": "Cart item not found"},
            status=404
        )


# ---------------- ORDER ---------------- #

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_order(request):

    try:
        data = request.data

        name = data.get("name")
        address = data.get("address")
        phone = data.get("phone")
        payment_method = data.get("payment_method", "COD")

        if not phone or not phone.isdigit() or len(phone) != 10:
            return Response(
                {"error": "Invalid phone number"},
                status=400
            )

        cart = get_object_or_404(Cart, user=request.user)

        if not cart.items.exists():
            return Response(
                {"error": "Cart is empty"},
                status=400
            )

        total = sum(
            item.product.price * item.quantity
            for item in cart.items.all()
        )

        order = Order.objects.create(
            user=request.user,
            name=name,
            address=address,
            phone=phone,
            payment_method=payment_method,
            total_amount=total
        )

        for item in cart.items.all():
            OrderItem.objects.create(
                order=order,
                product=item.product,
                quantity=item.quantity,
                price=item.product.price
            )

        cart.items.all().delete()

        return Response(
            {
                "message": "Order created successfully",
                "order_id": order.id
            },
            status=201
        )

    except Exception as e:
        return Response(
            {"error": str(e)},
            status=500
        )


# ---------------- REGISTER ---------------- #

@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):

    serializer = RegisterSerializer(data=request.data)

    if serializer.is_valid():
        user = serializer.save()

        return Response(
            {
                "message": "User created successfully",
                "user": UserSerializer(user).data
            },
            status=status.HTTP_201_CREATED
        )

    return Response(serializer.errors, status=400)





#admin pass :ecomerce