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
    completed = graphene.Boolean()
    created_at = graphene.DateTime()
    updated_at = graphene.DateTime()

    class Arguments:
        text = graphene.String()
        completed = graphene.Boolean()
        created_at = graphene.DateTime()
        updated_at = graphene.DateTime()

    def mutate(self, info, text, completed, created_at, updated_at):
        todo = TodoModel(text=text, completed=completed,
                         created_at=created_at, updated_at=updated_at)
        todo.save()

        return CreateTodo(
            id=todo.id,
            text=todo.text,
            completed=todo.completed,
            created_at=todo.created_at,
            updated_at=todo.udpated_at,
        )


class Mutation(graphene.ObjectType):
    create_todo = CreateTodo.Field()


schema = graphene.Schema(
    query=Query,
    mutation=Mutation
)
