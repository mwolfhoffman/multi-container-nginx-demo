from datetime import datetime
from graphene_django import DjangoObjectType
import graphene
from core.models import TodoModel


class TodoType(DjangoObjectType):
    class Meta:
        model = TodoModel


class Query(graphene.ObjectType):
    todos = graphene.List(TodoType)
    todo_by_id = graphene.Field(TodoType, id=graphene.Int())

    def resolve_todos(self, info):
        return TodoModel.objects.all()

    def resolve_todo_by_id(self, info, id):
        return TodoModel.objects.get(id=id)


class CreateTodo(graphene.Mutation):
    id = graphene.Int()
    text = graphene.String()

    class Arguments:
        text = graphene.String()

    def mutate(self, info, text):
        todo = TodoModel(text=text, completed=False,
                         created_at=datetime.now(), updated_at=datetime.now())
        todo.save()

        return CreateTodo(
            id=todo.id,
            text=todo.text,
            completed=todo.completed,
            created_at=todo.created_at,
            updated_at=todo.updated_at,
        )


class DeleteTodo(graphene.Mutation):
    id = graphene.Int()

    class Arguments:
        id = graphene.Int()

    success = graphene.Boolean()

    @classmethod
    def mutate(cls, rood, info, id):
        todo = TodoModel.objects.get(id=id)
        todo.delete()
        return DeleteTodo(
            success=True
        )


class Mutation(graphene.ObjectType):
    create_todo = CreateTodo.Field()
    delete_todo = DeleteTodo.Field()


schema = graphene.Schema(
    query=Query,
    mutation=Mutation
)
