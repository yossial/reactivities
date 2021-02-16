using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
  public class Edit
  {
    public class Command : IRequest
    {
      public Activity activity { get; set; }
    }
    public class Handler : IRequestHandler<Command>
    {
      private readonly DataContext _dataContext;
      private readonly IMapper _mapper;
      public Handler(DataContext dataContext, IMapper mapper)
      {
        _mapper = mapper;
        _dataContext = dataContext;
      }

      public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
      {
        var activity = await _dataContext.Activities.FindAsync(request.activity.Id);
        _mapper.Map(request.activity, activity);
        await _dataContext.SaveChangesAsync();
        return Unit.Value;
      }
    }
  }
}