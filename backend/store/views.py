from django.shortcuts import render
from django.http import JsonResponse

# Create your views here.

from rest_framework.response import Response
from .models import Category,Product
from .serializiers import ProductSerializer,CategorySerializer
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