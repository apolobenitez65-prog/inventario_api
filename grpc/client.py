
import grpc
import producto_pb2
import producto_pb2_grpc

# Conectar con el servidor gRPC de Node.js
with grpc.insecure_channel('127.0.0.1:50051') as canal:

    # Crear el cliente del servicio
    stub = producto_pb2_grpc.ProductoServiceStub(canal)

    try:
        # Solicitar el producto con ID 1
        producto = stub.ObtenerProducto(
            producto_pb2.ProductoRequest(id=1)
        )

        print("Producto recibido:")
        print(producto)

    except grpc.RpcError as error:
        print("Error gRPC:", error.code())
        print("Detalle:", error.details())
