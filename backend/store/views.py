from django.shortcuts import render
from django.http import JsonResponse
from django.shortcuts import get_object_or_404

# Create your views here.

from rest_framework.response import Response
from .models import Category,Product,Cart,CartItem
from .serializiers import ProductSerializer,CategorySerializer,CartSerializer
from rest_framework.decorators import api_view



@api_view(['GET'])
def get_products(request):
    products=Product.objects.all()
    serializer=ProductSerializer(products,many=True,context={"request": request})
    return Response(serializer.data)





@api_view(['GET'])
def get_product(request, pk):
    try:
        product = Product.objects.get(id=pk)
        serializer = ProductSerializer(product, context = {'request': request})
        return Response(serializer.data)
    except Product.DoesNotExist:
        return Response({'error': 'Product not found'}, status=404)

@api_view(['GET'])
def get_categories(request):
    categories=Category.objects.all()
    serializer=CategorySerializer(categories,many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_cart(request):
    cart, created = Cart.objects.get_or_create(user=None)
    serializer = CartSerializer(cart)
    return Response(serializer.data)

@api_view(['POST'])
def add_to_cart(request):
    product_id=request.data.get('product_id')
    product = get_object_or_404(Product, id=product_id)
    cart, created = Cart.objects.get_or_create(user=None)
    item, created=CartItem.objects.get_or_create(cart=cart, product=product)
    if not created:
        item.quantity+=1
        item.save()
    return Response({'message': 'Product added to cart',"cart":CartSerializer(cart).data})



@api_view(['POST'])
def remove_from_cart(request):
    print(request.data)
    item_id=request.data.get('item_id')
    CartItem.objects.filter(id=item_id).delete()
    return Response({"message":"removed from cart"})



@api_view(['POST'])
def update_cart(request):
    item_id=request.data.get('item_id')
    quantity=request.data.get('quantity')
    if not item_id or quantity is None:
        return Response({"error":"Item removed from the cart"},status=400)
    
    try:
        item=CartItem.objects.get(id=item_id)
        if int(quantity) < 1:
            item.delete()
            return Response({'error':"quantity should be atleast 1 "},status=400)
        
        item.quantity=quantity
        item.save()
        serializer=CartSerializer(item)
        return Response(serializer.data)
    except CartItem.DoesNotExist:
        return Response({"error":"Cart Item does not exist "},status=404)
        

#admin pass :ecomerce